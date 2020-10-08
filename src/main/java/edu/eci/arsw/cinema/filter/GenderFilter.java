package edu.eci.arsw.cinema.filter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.model.Movie;
import edu.eci.arsw.cinema.persistence.CinemaException;

@Service("Filtro Genero")
public class GenderFilter implements CinemaFilter{
	
	@Override
	public List<CinemaFunction> filtro(List<CinemaFunction> Listfunciones, String filtro) throws CinemaException{
		List<CinemaFunction> ListDisponibles = new ArrayList<>();
		for(CinemaFunction funcion : Listfunciones) {
			Movie peli = funcion.getMovie();
			if(peli.getGenre().equals(filtro)) {
				ListDisponibles.add(funcion);
			}
		}
		if(ListDisponibles.size()==0) {
			throw new CinemaException("No hay funciones con el genero que desea");
		}
		return ListDisponibles;
		
	}
	
}
