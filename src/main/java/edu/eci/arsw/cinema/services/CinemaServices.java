/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.services;

import edu.eci.arsw.cinema.filter.CinemaFilter;
import edu.eci.arsw.cinema.model.Cinema;
import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.persistence.CinemaException;
import edu.eci.arsw.cinema.persistence.CinemaPersistenceException;
import edu.eci.arsw.cinema.persistence.CinemaPersitence;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class CinemaServices {
	
    @Autowired
    @Qualifier("InMemoryCinemaPersistence")
    CinemaPersitence cps=null;
    
    @Autowired
    @Qualifier("Filtro Genero")
    CinemaFilter Filt=null;
    
    public void addNewCinema(Cinema c) throws CinemaPersistenceException{
        cps.saveCinema(c);
    }
    
    public Set<Cinema> getAllCinemas() throws CinemaPersistenceException{
        return cps.getAllCinemas();
    }
    
    /**
     * 
     * @param name cinema's name
     * @return the cinema of the given name created by the given author
     * @throws CinemaException
     * @throws CinemaPersistenceException 
     */
    public Cinema getCinemaByName(String name) throws CinemaException {
        try {
			return cps.getCinema(name);
		} catch (CinemaPersistenceException e) {
			throw new CinemaException(e.getMessage(), e);
		}
    }
    
    
    public void buyTicket(int row, int col, String cinema, String date, String movieName) throws CinemaException {
        try {
			cps.buyTicket(row, col, cinema, date, movieName);
		} catch (CinemaPersistenceException e) {
			throw new CinemaException(e.getMessage(), e);
		}
    }
    
    public List<CinemaFunction> getFunctionsbyCinemaAndDate(String cinema, String date) throws CinemaException {
    	try {
			return cps.getFunctionsbyCinemaAndDate(cinema, date);
		} catch (CinemaPersistenceException e) {
			throw new CinemaException(e.getMessage(), e);
		}
    }
    
    public List<CinemaFunction> getFilterFunctions(String cinema, String date, String filtro) throws CinemaException{
        try{
            return Filt.filtro(getFunctionsbyCinemaAndDate(cinema,date), filtro);
        }catch(CinemaException e){
            throw new CinemaException(e.getMessage());
        }
    }
    
    public CinemaFunction getFunctionByCinemaDateMovie(String cinema, String date, String moviename) throws CinemaException {
        try{
            return cps.getFunctionByCinemaDateMovie(cinema,date,moviename);
        }catch(CinemaPersistenceException e){
            throw new CinemaException(e.getMessage());
        }
    }
    
    public void NewFunction(String name, CinemaFunction funcion) throws CinemaPersistenceException, CinemaException {
		try{
            cps.NewFunction(name,funcion);
        }catch(CinemaPersistenceException e){
            throw new CinemaException(e.getMessage());
        }
	}
    
    public void SetFunction(String name, CinemaFunction funcion) throws CinemaPersistenceException, CinemaException {
		try{
            cps.SetFunction(name,funcion);
        }catch(CinemaPersistenceException e){
            throw new CinemaException(e.getMessage());
        }
	}

    public void DeleteFunction(String name, CinemaFunction funcion) throws CinemaPersistenceException, CinemaException {
        try{
            cps.DeleteFunction(name,funcion);
        }catch(CinemaPersistenceException e){
            throw new CinemaException(e.getMessage());
        }
    }
}
