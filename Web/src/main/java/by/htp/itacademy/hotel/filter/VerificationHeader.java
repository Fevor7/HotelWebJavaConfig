package by.htp.itacademy.hotel.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static by.htp.itacademy.hotel.util.AddressPage.*;
import static by.htp.itacademy.hotel.util.Parameter.*;
import static by.htp.itacademy.hotel.util.Parameter.REQUEST_ACTION_ROOM_PAYMENT;
import static by.htp.itacademy.hotel.util.Parameter.REQUEST_PARAMETER_ORDER;

/**
 * The object of this filter checks whether the request contains the desired
 * header.
 * 
 * @author viktor
 *
 */
public class VerificationHeader implements Filter {

	private static final List<String> actionList = Arrays.asList("/room", "/about");


	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		String url = req.getRequestURI();
		if(actionList.contains(url)) {
			req.getRequestDispatcher("").forward(request,response);
			return;
		}
        chain.doFilter(request, response);

	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
