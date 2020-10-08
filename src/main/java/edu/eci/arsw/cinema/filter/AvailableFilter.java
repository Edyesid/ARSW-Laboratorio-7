package edu.eci.arsw.cinema.filter;

import java.util.ArrayList;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.eci.arsw.cinema.model.CinemaFunction;

import edu.eci.arsw.cinema.persistence.CinemaException;

@Service("Filtro Disponibilidad")
public class AvailableFilter implements CinemaFilter{
	
	@Override
	public List<CinemaFunction> filtro(List<CinemaFunction> Listfunciones, String filtro) throws CinemaException{
		int filt;
		try {
			filt=Integer.parseInt(filtro);
			if(filt<=0) {
				throw new CinemaException("Filtro invalido, ingrese un numero entero mayor a 0");
			}
		}
		catch(NumberFormatException e) {
			throw new CinemaException("Filtro invalido, ingrese un numero entero mayor a 0");
		}
		List<CinemaFunction> ListDisponibles = new ArrayList<>();
		int ContDisp=0;
		for (CinemaFunction funcion : Listfunciones) {
			for(List<Boolean> seats : funcion.getSeats()) {
				for(Boolean seat : seats) {
					if(seat) {
						ContDisp+=1;
					}
				}
			}
			if (ContDisp >= filt) {
				ListDisponibles.add(funcion);
			}
		}
		if(ListDisponibles.size()==0) {
			throw new CinemaException("No hay funciones con la cantidad de sillas disponibles que desea");
		}
		return ListDisponibles;
		
	}
	

}
