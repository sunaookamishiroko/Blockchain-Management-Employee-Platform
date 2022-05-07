package com.example.databasebackend.repository;

import com.example.databasebackend.model.Qrcode;
import com.example.databasebackend.model.QrcodePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QrcodeRepository extends JpaRepository<Qrcode, QrcodePK> {
}
