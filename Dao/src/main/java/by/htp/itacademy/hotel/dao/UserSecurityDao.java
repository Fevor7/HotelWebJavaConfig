package by.htp.itacademy.hotel.dao;

import by.htp.itacademy.hotel.domain.entity.UserSecurity;

import java.util.List;

public interface UserSecurityDao extends IDao<UserSecurity>{

    UserSecurity findByName(String name);

    List<UserSecurity> findAll();
}
