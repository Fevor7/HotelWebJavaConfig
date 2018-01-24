package by.htp.itacademy.hotel.service;

import by.htp.itacademy.hotel.domain.entity.UserSecurity;

import java.util.List;

public interface UserSecurityService {

    UserSecurity save(UserSecurity userSecurity);
    List<UserSecurity> findAll();
    void delete(Long id);
}
