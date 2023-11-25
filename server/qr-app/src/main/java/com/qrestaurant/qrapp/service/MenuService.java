package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.entity.Menu;
import com.qrestaurant.qrapp.repository.MenuRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public Menu getMenu(Long id) throws EntityNotFoundException {
        return menuRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu with id: " + id + " does not exists."));
    }

    @KafkaListener(topics = "dashboard-menu", groupId = "qrestaurant",
            containerFactory = "menuConcurrentKafkaListenerContainerFactory")
    public void menuListener(Menu menu) {
        menuRepository.save(menu);
    }
}
