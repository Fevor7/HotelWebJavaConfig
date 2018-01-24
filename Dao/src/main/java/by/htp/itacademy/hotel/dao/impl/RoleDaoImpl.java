package by.htp.itacademy.hotel.dao.impl;

import by.htp.itacademy.hotel.dao.RoleDao;
import by.htp.itacademy.hotel.domain.entity.Role;
import org.springframework.stereotype.Repository;

@Repository
public class RoleDaoImpl extends DaoImpl<Role> implements RoleDao{
    public RoleDaoImpl() {
        super(Role.class);
    }
}
