package by.htp.itacademy.hotel.dao;

public interface IDao<T> {
	
	void add(T model);

	void delete(Long id);

	T update(T model);
	
	T get(Long id);
}
