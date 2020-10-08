/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.test;

import edu.eci.arsw.cinema.services.CinemaServices;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 *
 * @author cristian
 */
@RunWith(SpringRunner.class)
@SpringBootTest()
@AutoConfigureMockMvc
public class ApplicationServicesTest {
	
	@Autowired
    private MockMvc mockmvc;

    @Autowired
    private CinemaServices Servicios;

    @Test
    public void deberiatraercinemas () throws Exception {
    	mockmvc.perform(
                MockMvcRequestBuilders.get("/cinemas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isAccepted());
    }  
    
    @Test
    public void deberiatraerfuncionesXnameCinema () throws Exception {
    	mockmvc.perform(
                MockMvcRequestBuilders.get("/cinemas/CineColombia")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isAccepted());
    }
    
    @Test
    public void deberiatraerfuncionesXnameCinemaAndDate () throws Exception {
    	mockmvc.perform(
                MockMvcRequestBuilders.get("/cinemas/CineColombia/2018-12-18")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isAccepted());
    }
    
    @Test
    public void deberiatraerfuncionesXnameCinemaAndDateAndNamePeli () throws Exception {
    	mockmvc.perform(
                MockMvcRequestBuilders.get("/cinemas/cinemaX/2018-12-18/The Nigth")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isAccepted());
    }
      
    
    @Test
    public void noCinemaName () throws Exception{
    	mockmvc.perform(
                MockMvcRequestBuilders.get("/cinemas/cmko")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isBadRequest());
    }
    
    @Test
    public void NodeberiatraerfuncionesXnameCinemaAndDate () throws Exception {
    	mockmvc.perform(
                MockMvcRequestBuilders.get("/cinemas/CineColombia/1988-06-12")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isBadRequest());
    }
    
    @Test
    public void NodeberiatraerfuncionesXnameCinemaAndDateAndNamePeli () throws Exception {
    	mockmvc.perform(
                MockMvcRequestBuilders.get("/cinemas/CineColombia/2018-12-18/FastAndFurious")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isAccepted());
    }
    
    
}
