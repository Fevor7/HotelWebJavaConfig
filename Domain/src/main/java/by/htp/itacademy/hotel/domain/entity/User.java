package by.htp.itacademy.hotel.domain.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The object of this class stores information about the user. It is possible to
 * serialize an object of this class.
 * 
 * @author Viktor
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user")
public class User implements Serializable {

	private static final long serialVersionUID = -3115010418744396347L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String login;
	private Integer hashCodePass;
	@Transient
	private String password;
	private String name;
	private String surname;
	private String email;
	private Boolean role;

	public User(String login) {
		this.login = login;
	}

	public User(Long id) {
		this.id = id;
	}

	public User(String login, Integer hashLong) {
		this.login = login;
		this.hashCodePass = hashLong;
	}

	public User(String login, Integer hashPassUser, String name, String surname, String email, Boolean role) {
		this.login = login;
		this.hashCodePass = hashPassUser;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.role = role;
	}

    public void setLogin(String login) {
        this.login = login;
    }

    public User setHashCodePass(Integer hashCodePass) {
        this.hashCodePass = hashCodePass;
        return this;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public User setName(String name) {
        this.name = name;
        return this;
    }

    public User setSurname(String surname) {
        this.surname = surname;
        return this;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public User setRole(Boolean role) {
        this.role = role;
        return this;
    }
}
