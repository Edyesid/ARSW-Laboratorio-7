/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.controllers;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.eci.arsw.cinema.model.Cinema;
import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.persistence.CinemaException;
import edu.eci.arsw.cinema.persistence.CinemaPersistenceException;
import edu.eci.arsw.cinema.services.CinemaServices;

@RestController
@RequestMapping(value = "/cinemas")
public class CinemaAPIController {
	
    @Autowired
    CinemaServices csp;
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> manejadorRecursoCinemas() {
    	try {
    		Set<Cinema> data = csp.getAllCinemas();
			return new ResponseEntity<>(data,HttpStatus.ACCEPTED);
    	} catch (CinemaPersistenceException e) {
    		Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error 404",HttpStatus.NOT_FOUND);
    	}
    }
    
    
    @RequestMapping(value="/{name}", method= RequestMethod.GET)
    public ResponseEntity<?> manejadorRecursoCinema(@PathVariable("name") String name) {
    	try {
    		Cinema data = csp.getCinemaByName(name);
			return new ResponseEntity<>(data,HttpStatus.ACCEPTED);
    		
 	
    	} catch (CinemaException e) {
    		Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error 404",HttpStatus.NOT_FOUND);
    	}
    }
    
    
    @RequestMapping(value="/{name}/{date}", method= RequestMethod.GET)
    public ResponseEntity<?> manejadorRecursoCinemaDate(@PathVariable("name") String name, @PathVariable("date") String date) {
		System.out.println("-------entro1---------");
    	try {
    		List<CinemaFunction> data = csp.getFunctionsbyCinemaAndDate(name,date);
			return new ResponseEntity<>(data,HttpStatus.ACCEPTED);
    		
    	} catch (CinemaException e) {
    		Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error 404",HttpStatus.NOT_FOUND);
    	}
    }
    
    @RequestMapping(value="/{name}/{date}/{moviename}", method= RequestMethod.GET)
    public ResponseEntity<?> manejadorRecursoCinemaDateMoviename(@PathVariable("name") String name, @PathVariable("date") String date, @PathVariable("moviename") String moviename) {
		System.out.println("-------entro2---------");
    	try {
    		CinemaFunction data = csp.getFunctionByCinemaDateMovie(name,date,moviename);
    		return new ResponseEntity<>(data,HttpStatus.ACCEPTED);

    	} catch (CinemaException e) {
    		Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error 404",HttpStatus.NOT_FOUND);
    	}
    }
    
    @RequestMapping(value="/{name}", method = RequestMethod.POST)	
    public ResponseEntity<?> manejadorPostRecursoName(@RequestBody CinemaFunction funcion,@PathVariable("name") String name) throws CinemaPersistenceException{
        try {
            csp.NewFunction(name, funcion);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (CinemaException ex) {
            Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla",HttpStatus.FORBIDDEN);            
        }        

    }
    
    @RequestMapping(value="/{name}", method = RequestMethod.PUT)
    public ResponseEntity<?> manejadorPutRecursoName(@RequestBody CinemaFunction funcion,@PathVariable("name") String name) throws CinemaPersistenceException{
		System.out.println("entro -------------------------------------------- entro");
    	try {
			System.out.println(name);
			System.out.println(funcion.getMovie().getName());
			System.out.println(funcion.getDate());
			System.out.println(funcion.getSeats());
            csp.SetFunction(name, funcion);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (CinemaException ex) {
            Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla",HttpStatus.FORBIDDEN);            
        }
    }

	@RequestMapping(value="/{name}", method = RequestMethod.DELETE)
	public ResponseEntity<?> manejadorDeleteRecursoName(@RequestBody CinemaFunction funcion,@PathVariable("name") String name) throws CinemaPersistenceException{
		try {
			csp.DeleteFunction(name, funcion);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (CinemaException ex) {
			Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
			return new ResponseEntity<>("Error bla bla bla",HttpStatus.FORBIDDEN);
		}
	}

	@RequestMapping(value="/{name}/{date}/{moviename}/{row}/{col}", method = RequestMethod.PUT)
	public ResponseEntity<?> manejadorPutBuyTicket(@PathVariable("name") String name,@PathVariable("date") String date,@PathVariable("moviename") String moviename,@PathVariable("row") String row,@PathVariable("col") String col) throws CinemaPersistenceException{
		System.out.println("entro --------------------buyticket------------------------ entro");
		try {

			System.out.println(name);
			System.out.println(date);
			System.out.println(moviename);
			System.out.println(row);
			System.out.println(col);

			csp.buyTicket(Integer.parseInt(row), Integer.parseInt(col),name,date,moviename);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (CinemaException ex) {
			Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
			return new ResponseEntity<>("Error bla bla bla",HttpStatus.FORBIDDEN);
		}
	}
}
