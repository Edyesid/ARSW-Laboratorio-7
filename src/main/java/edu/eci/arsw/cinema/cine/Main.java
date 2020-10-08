/*
package edu.eci.arsw.cinema.cine;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import edu.eci.arsw.cinema.model.Cinema;
import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.model.Movie;
import edu.eci.arsw.cinema.persistence.CinemaException;
import edu.eci.arsw.cinema.persistence.CinemaPersistenceException;
import edu.eci.arsw.cinema.services.CinemaServices;

public class Main {
    public static void main(String a[]) throws CinemaPersistenceException, CinemaException {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        CinemaServices cf = applicationContext.getBean(CinemaServices.class);
        //register cinemas
        List<CinemaFunction> functions= new ArrayList<>();
        CinemaFunction function1 = new CinemaFunction(new Movie("Avengers","Action"),"2020-12-18 15:30");
        CinemaFunction function2 = new CinemaFunction(new Movie("TheRing","Horror"),"2020-12-19 13:00");
        CinemaFunction function3 = new CinemaFunction(new Movie("Superman","Action"),"2020-12-19 13:00");
        CinemaFunction function4 = new CinemaFunction(new Movie("Coco","Animated"),"2020-12-19 13:00");
        functions.add(function1);
        functions.add(function2);
        functions.add(function3);
        functions.add(function4);
        
        Cinema autoCine = new Cinema("autoCine",functions);
        
        cf.addNewCinema(autoCine);
        
        //consult cinemas
        System.out.println("-------------cinemas------------------");
        System.out.println(cf.getAllCinemas());
        
        for (Cinema cadena : cf.getAllCinemas()) {
        	 System.out.println(cadena.getName());
        }
        
        CinemaFunction funcion = cf.getFunctionByCinemaDateMovie("cinemaX", "2018-12-18","SuperHeroes Movie");
        System.out.println("--------------funcion-----------");
        System.out.println(funcion);
        

        System.out.println(funcion.getMovie().getName());
   
        
        System.out.println("-------------comprar boleto------------------");
        
        cf.buyTicket(0, 0, "autoCine", "2020-12-19 13:00", "Coco");
        
        for (int j = 0; j < 7; j++) {System.out.println(cf.getCinemaByName("autoCine").getFunctions().get(3).getSeats().get(j));}
        
    }
}
*/