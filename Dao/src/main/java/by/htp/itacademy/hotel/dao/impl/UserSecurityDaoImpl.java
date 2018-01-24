package by.htp.itacademy.hotel.dao.impl;

import by.htp.itacademy.hotel.dao.UserSecurityDao;
import by.htp.itacademy.hotel.domain.entity.UserSecurity;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import java.util.List;


@Repository
public class UserSecurityDaoImpl extends DaoImpl<UserSecurity> implements UserSecurityDao{

    public UserSecurityDaoImpl() {
        super(UserSecurity.class);
    }

    @Override
    public UserSecurity findByName(String name) {
        Query query = getEm().createQuery("from UserSecurity u where u.username = ?1", UserSecurity.class);
        query.setParameter(1, name);
        return (UserSecurity) query.getSingleResult();
    }

    @Override public List<UserSecurity> findAll() {
        Query query = getEm().createQuery("from UserSecurity", UserSecurity.class);
        return query.getResultList();
    }
}
