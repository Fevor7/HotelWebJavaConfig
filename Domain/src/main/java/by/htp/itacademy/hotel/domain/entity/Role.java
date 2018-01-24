package by.htp.itacademy.hotel.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "userList")
@ToString(exclude = "userList")
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String name;
    @ManyToMany(mappedBy = "roleList")
    private List<UserSecurity> userList;
}
