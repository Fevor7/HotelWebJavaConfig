package by.htp.itacademy.hotel.dao.impl;

import by.htp.itacademy.hotel.dao.UserSecurityDao;
import by.htp.itacademy.hotel.domain.entity.UserSecurity;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;


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
}
