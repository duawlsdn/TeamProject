package com.example.cafekiosk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
    public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/api/**").permitAll()  // API는 모두 허용
                        .anyRequest().authenticated()            // 나머지는 인증 필요
                )
                .csrf(Customizer.withDefaults()) // 기본 설정 유지. disable 원하면 아래 참고
                .httpBasic(Customizer.withDefaults()); // 인증 창 없이 테스트 가능

        return http.build();
    }
}
