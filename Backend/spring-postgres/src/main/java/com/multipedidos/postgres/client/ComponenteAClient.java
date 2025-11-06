package com.multipedidos.postgres.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;

@Service
@Slf4j
public class ComponenteAClient {

    private final WebClient webClient;

    public ComponenteAClient(@Value("${componente-a.url}") String componenteAUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(componenteAUrl)
                .build();
    }

    public List<Object> getPedidosByClienteId(Long clienteId) {
        log.info("Consultando pedidos del cliente {} desde Componente A", clienteId);

        try {
            List<Object> pedidos = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/pedidos")
                            .queryParam("clienteId", clienteId)
                            .build())
                    .retrieve()
                    .bodyToMono(List.class)
                    .timeout(Duration.ofSeconds(5))
                    .retryWhen(reactor.util.retry.Retry.fixedDelay(2, Duration.ofSeconds(1)))
                    .onErrorResume(error -> {
                        log.error("Error al consultar Componente A: {}", error.getMessage());
                        return Mono.just(List.of());
                    })
                    .block();

            log.info("Se obtuvieron {} pedidos del Componente A", pedidos != null ? pedidos.size() : 0);
            return pedidos != null ? pedidos : List.of();
        } catch (Exception e) {
            log.error("Excepcion al consultar Componente A: {}", e.getMessage());
            return List.of();
        }
    }
}
