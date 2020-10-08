package edu.eci.arsw.cinema.filter;

import java.util.List;

import edu.eci.arsw.cinema.model.CinemaFunction;

import edu.eci.arsw.cinema.persistence.CinemaException;

public interface CinemaFilter {
	
	public List<CinemaFunction> filtro(List<CinemaFunction> Listfunciones, String filtro) throws CinemaException;

}
