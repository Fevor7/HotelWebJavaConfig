package by.htp.itacademy.hotel.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "userSecuritySet")
@ToString(exclude = "userSecuritySet")
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @ManyToMany(mappedBy = "roleSet")
    private Set<UserSecurity> userSecuritySet;
}
