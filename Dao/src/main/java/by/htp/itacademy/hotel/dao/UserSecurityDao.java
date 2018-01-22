package by.htp.itacademy.hotel.dao;

import by.htp.itacademy.hotel.domain.entity.UserSecurity;

public interface UserSecurityDao extends IDao<UserSecurity>{

    UserSecurity findByName(String name);

}
