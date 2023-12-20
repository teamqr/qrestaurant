package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.configuration.PasswordConfiguration;
import com.qrestaurant.qrapp.configuration.SecurityConfiguration;
import com.qrestaurant.qrapp.model.entity.Table;
import com.qrestaurant.qrapp.service.TableService;
import com.qrestaurant.qrapp.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({TableController.class})
@Import({SecurityConfiguration.class})
class TableControllerTest {
    @MockBean
    private TableService tableService;
    @MockBean
    private UserService userService;
    @MockBean
    private JwtDecoder jwtDecoder;
    @MockBean
    private PasswordConfiguration passwordConfiguration;
    @MockBean
    private AuthenticationManager authenticationManager;
    @MockBean
    private MapperDTO mapperDTO;

    @Autowired
    private MockMvc mvc;

    @Test
    void shouldGetUnauthorized() throws Exception {
        //then
        this.mvc.perform(get("/api/app/table/TB")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void shouldGetTableByCode() throws Exception {
        //given
        final String code = "TB";
        final Table table = new Table();

        //when
        when(this.tableService.getTable(code)).thenReturn(table);

        //then
        this.mvc.perform(get("/api/app/table/{code}", code)).andExpect(status().isOk());
    }
}