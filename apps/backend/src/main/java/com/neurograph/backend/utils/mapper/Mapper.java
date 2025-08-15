package com.neurograph.backend.utils.mapper;

public interface Mapper<F, T> {
    F toEntity(T dto);
    T toDto(F entity);
}
