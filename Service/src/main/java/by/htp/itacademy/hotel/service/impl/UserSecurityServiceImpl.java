package by.htp.itacademy.hotel.service.impl;

import by.htp.itacademy.hotel.dao.RoleDao;
import by.htp.itacademy.hotel.dao.UserSecurityDao;
import by.htp.itacademy.hotel.domain.entity.Role;
import by.htp.itacademy.hotel.domain.entity.UserSecurity;
import by.htp.itacademy.hotel.service.UserSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service(value = "userService")
@Transactional
public class UserSecurityServiceImpl implements UserDetailsService, UserSecurityService {

    @Autowired
    private UserSecurityDao userSecurityDao;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private RoleDao roleDao;


    @Override public UserSecurity save(UserSecurity user) {
        user.setPassword(encoder.encode(user.getPassword()));
        List<Role> roles = new ArrayList<>();
        roles.add(roleDao.get(1L));
        user.setRoleList(roles);
        userSecurityDao.add(user);
        return user;
    }

    @Override public List<UserSecurity> findAll() {
        List<UserSecurity> list = new ArrayList<>();
        userSecurityDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override public void delete(Long id) {
        userSecurityDao.delete(id);
    }

    @Override public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        UserSecurity userSecurity = userSecurityDao.findByName(username);
        if(userSecurity == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        User user = new User(userSecurity.getUsername(), userSecurity.getPassword(), getAuthority());
        return new User(userSecurity.getUsername(), userSecurity.getPassword(), getAuthority());
    }

    private List<SimpleGrantedAuthority> getAuthority() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }
}
