package by.htp.itacademy.hotel.service.impl;

import by.htp.itacademy.hotel.dao.OrderDao;
import by.htp.itacademy.hotel.dao.RoomDao;
import by.htp.itacademy.hotel.dao.StatusOrderDao;
import by.htp.itacademy.hotel.dao.exception.DaoException;
import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.Room;
import by.htp.itacademy.hotel.domain.entity.StatusOrder;
import by.htp.itacademy.hotel.domain.entity.TypeRoom;

import by.htp.itacademy.hotel.domain.entity.User;
import by.htp.itacademy.hotel.domain.vo.ListPage;
import by.htp.itacademy.hotel.service.OrderService;
import by.htp.itacademy.hotel.service.exception.ServiceException;
import by.htp.itacademy.hotel.service.exception.ServiceNoOrderFoundException;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PersistenceException;

/**
 * The class of this class is designed to execute business logic with order.
 * 
 * @author Viktor
 *
 */
@Service
@Transactional
public class OrderServiceImpl implements OrderService {

	private static final Logger LOG = Logger.getLogger(OrderServiceImpl.class);
	private static final String LOG_ORDER_UPDATE = "ORDER UPDATE: ";
	private static final String LOG_ORDER_CREATE = "ORDER CREATE: ";
	private static final String LOG_ORDER_DELETE = "ORDER DELETE: ";
	private static final String LOG_ADMIN = " Admin ID: ";
	private static final String LOG_USER = " User ID: ";
	private static final String LOG_ERROR = " ERROR: ";

	private static final Long STATUS_WAIT = 1L;
	private static final Long STATUS_CONFIRMED = 2L;

	private static final String ERROR_ORDER_FOUND = "No orders found.";
	private static final String ERROR_ORDER = "You do not have orders.";
	private static final String STATUS_LIST_ERROR = "Could not get status list";
	private static final String PAGE_CONTENT = "pagecontent";

	private static final Integer NUMBER_SECOND_IN_A_DAY = 86400000;
	private static final Byte CORRECTION_FACTOR = 1;

	@Autowired
	private StatusOrderDao statusOrderDao;
	@Autowired
	private OrderDao orderDao;
	@Autowired
	private RoomDao roomDao;

	@Override
	public void updateOrder(Order order, User user) throws ServiceException {
		try {
			StatusOrder status = orderDao.get(order.getOrderId()).getOrderStatus();
			order.setUser(user);
			order.setOrderStatus(status);
			orderDao.update(order);
			LOG.info(LOG_ORDER_UPDATE + order + LOG_USER + user.getId());
		} catch (HibernateException e) {
			e.printStackTrace();
			LOG.error(LOG_ERROR + e.getMessage() + LOG_USER + user.getId());
			throw new ServiceException(e.getMessage());
		}
	}

	@Override
	public void updateOrderAdmin(Order order, User user) throws ServiceException {
		System.out.println(order);
		try {
			order.setUser(user);
			orderDao.update(order);
			LOG.info(LOG_ORDER_UPDATE + order + LOG_ADMIN + user.getId());
		} catch (HibernateException  e) {
			LOG.error(LOG_ERROR + e.getMessage() + LOG_USER + user.getId());
			throw new ServiceException(e.getMessage());
		}
	}

	@Override
	public void createOrder(Order order, User user) throws ServiceException {
		try {
			order.setUser(user);
			order.setOrderStatus(new StatusOrder(1L, null));
			orderDao.add(order);
			LOG.info(LOG_ORDER_CREATE + order + LOG_USER + user.getId());
		} catch (HibernateException e) {
			LOG.error(LOG_ERROR + e.getMessage() + LOG_USER + user.getId());
			throw new ServiceException(e.getMessage());
		}
	}

	@Override
	public ListPage<Order> orderListUser(ListPage<Order> listPage, User user)
			throws ServiceNoOrderFoundException {
		try {
			listPage = orderDao.fetchUserOrder(listPage, user);
		} catch (HibernateException e) {
			LOG.error(LOG_ERROR + e.getMessage() + LOG_USER + user.getId());
		}
		if (listPage.getData().isEmpty()) {
			throw new ServiceNoOrderFoundException(ERROR_ORDER);
		}
		return listPage;
	}

	@Override
	public ListPage<Order> orderList(ListPage<Order> listPage, Long id, User user)
			throws ServiceNoOrderFoundException {
		try {
			if (id == 5) {
				listPage = orderDao.getAll(listPage);
			} else {
				orderDao.fetchSomethingOrder(listPage, id);
			}
		} catch (HibernateException e) {

			LOG.error(LOG_ERROR + e.getMessage() + LOG_USER + user.getId());
		}
		if (listPage.getData().isEmpty()) {
			throw new ServiceNoOrderFoundException(ERROR_ORDER_FOUND);
		}
		return listPage;
	}

	@Override
	public void orderDelete(Order order, User user) throws ServiceException {
		try {
			orderDao.delete(order.getOrderId());
			LOG.info(LOG_ORDER_DELETE + order + LOG_USER + user.getId());
		} catch (HibernateException e) {
			e.printStackTrace();
			LOG.error(LOG_ERROR + e.getMessage() + LOG_USER + user.getId());
			throw new ServiceException(e.getMessage());
		}
	}

	@Override
	public List<StatusOrder> fetchStatusList() throws ServiceException {
		List<StatusOrder> list = null;
		try {
			list = statusOrderDao.getAll();
		} catch (HibernateException e) {
			LOG.error(LOG_ERROR + e.getMessage());
		}
		if (list == null) {
			throw new ServiceException(STATUS_LIST_ERROR);
		}
		return list;
	}

	/**
	 * The method calculates the total value of the order.
	 * 
	 * @param order
	 * @return
	 * @throws DaoException
	 */
	private BigDecimal calculationTotalCost(Order order) throws HibernateException {
		Room room = roomDao.get(order.getRoom().getId());
		BigDecimal totalCost = null;
		if (room != null) {
			BigDecimal roomPrice = room.getPrice();
			BigDecimal numberDays = calculationNumberDays(order);
			totalCost = roomPrice.multiply(numberDays);
			order.getTypeRoom().setId(room.getTypeRoom().getId());
		}
		return totalCost;
	}

	/**
	 * The method calculates the number of nights in a hotel.
	 * 
	 * @param order
	 * @return
	 */
	private BigDecimal calculationNumberDays(Order order) {
		Date dateStart = order.getDateStart();
		Date dateEnd = order.getDateEnd();
		Long differenceDay = (dateEnd.getTime() - dateStart.getTime()) / NUMBER_SECOND_IN_A_DAY + CORRECTION_FACTOR;
		BigDecimal numberDays = new BigDecimal(differenceDay);
		return numberDays;
	}

}
