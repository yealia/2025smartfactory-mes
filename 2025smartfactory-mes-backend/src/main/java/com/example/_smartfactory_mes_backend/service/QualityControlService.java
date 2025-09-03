package com.example._smartfactory_mes_backend.service;

import com.example._smartfactory_mes_backend.dto.QualityControlDto;
import com.example._smartfactory_mes_backend.entity.QualityControlEntity;
import com.example._smartfactory_mes_backend.repository.QualityControlRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QualityControlService {

    private final QualityControlRepository qualityControlRepository;

    //erp에서 웹훅으로 들어온 검사 요청을 저장
//    @Transactional
//    public QualityControlDto saveInspection(QualityControlDto dto){
//        //이부분 설계에서 result 값을 default로 해야하는 거아닌가....
//        if(dto.getResult() == null){
//            dto.setResult("PENDING");
//        }
//        QualityControlEntity entity = dto.toEntity();
//        QualityControlEntity save = qualityControlRepository.save(entity);
//        return QualityControlDto.fromEntity(save);
//    }
    @Transactional
    public List<QualityControlDto> saveInspections(List<QualityControlDto> qualityControlDtos) {
        List<QualityControlEntity> entities = new ArrayList<>();

        for (QualityControlDto dto : qualityControlDtos) {
            // DTO → Entity 변환 (예: dto.toEntity() 메서드 있다고 가정)
            QualityControlEntity entity = dto.toEntity();

            // 결과값 없으면 기본값 "PENDING" 설정
            if (entity.getResult() == null) {
                entity.setResult("PENDING");
            }
            entities.add(entity);
        }

        // DB 저장
        List<QualityControlEntity> saved = qualityControlRepository.saveAll(entities);

        // Entity → DTO 변환 후 리턴
        return saved.stream()
                .map(QualityControlDto::fromEntity)
                .toList();
    }


    // 전체 조회
    public List<QualityControlDto> getAll() {
        return qualityControlRepository.findAll()
                .stream()
                .map(QualityControlDto::fromEntity)
                .toList();
    }

    // 단건 조회
    public QualityControlDto getById(Integer qualityControlId) {
        return qualityControlRepository.findById(qualityControlId)
                .map(QualityControlDto::fromEntity)
                .orElse(null);
    }
}
