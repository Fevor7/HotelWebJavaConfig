package by.htp.itacademy.hotel.initializer;


import by.htp.itacademy.hotel.config.AppConfiguration;
import by.htp.itacademy.hotel.filter.CORSFilter;
import by.htp.itacademy.hotel.filter.VerificationHeader;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;

public class AppInitialazer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[] { AppConfiguration.class };
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return null;
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }

    protected Filter[] getServletFilters() {
        Filter [] filters = { new CORSFilter(), new VerificationHeader() };
        return filters;
    }

}
