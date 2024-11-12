package ubb.proiect.MakeupSalon.bootstrap;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ubb.proiect.MakeupSalon.model.*;
import ubb.proiect.MakeupSalon.repository.EmployeeTreatmentRepository;
import ubb.proiect.MakeupSalon.repository.PersonRepository;
import ubb.proiect.MakeupSalon.repository.TreatmentRepository;
import ubb.proiect.MakeupSalon.repository.UserRepository;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class BootstrapData implements CommandLineRunner {

    private final TreatmentRepository treatmentRepository;
    private final PersonRepository personRepository;
    private final EmployeeTreatmentRepository employeeTreatmentRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        if(treatmentRepository.count() == 0) {
            loadUserPersonTreatmentsData();

        }
    }

    private void loadUserPersonTreatmentsData(){
        Treatment t1 = Treatment.builder()
                .name("Bridal Makeup")
                .description("Elegant and long-lasting makeup designed specifically for your wedding day, including a pre-event trial session.")
                .estimatedDuration(120)
                .price(150)
                .pictureUrl("/images/treatments/BridalMakeup.jpeg")
                .build();
        Treatment t2 = Treatment.builder()
                .name("Full Face Makeup")
                .description("A complete makeup application customized to your style preference, including foundation, eyes, lips, and cheeks.")
                .estimatedDuration(60)
                .price(75)
                .pictureUrl("/images/treatments/FullFaceMakeup.jpeg")
                .build();
        Treatment t3 = Treatment.builder()
                .name("Makeup Lesson")
                .description("One-on-one session where a makeup artist teaches you how to apply makeup effectively and choose products that suit you.")
                .estimatedDuration(60)
                .price(100)
                .pictureUrl("/images/treatments/MakeupLesson.jpeg")
                .build();
        Treatment t4 = Treatment.builder()
                .name("Airbrush Makeup")
                .description("A lightweight, flawless, and long-lasting makeup application using an airbrush technique for a smooth finish.")
                .estimatedDuration(30)
                .price(50)
                .pictureUrl("/images/treatments/AirbrushMakeup.jpeg")
                .build();
        Treatment t5 = Treatment.builder()
                .name("Prom or Special Event Makeup")
                .description("Glamorous and tailored makeup application for proms, parties, or other special occasions to make you stand out.")
                .estimatedDuration(120)
                .price(150)
                .pictureUrl("/images/treatments/PromOrSpecialEventMakeup.jpeg")
                .build();
        Treatment t6 = Treatment.builder()
                .name("Contouring and Highlighting")
                .description("Techniques used to define and enhance facial features using strategic shading and highlighting.")
                .estimatedDuration(30)
                .price(50)
                .pictureUrl("/images/treatments/ContouringAndHighlighting.jpeg")
                .build();
        Treatment t7 = Treatment.builder()
                .name("Eyelash Extensions")
                .description("Semi-permanent lashes applied to your natural eyelashes for a fuller, more dramatic look without the need for mascara.")
                .estimatedDuration(30)
                .price(35)
                .pictureUrl("/images/treatments/EyelashExtensions.jpeg")
                .build();
        Treatment t8 = Treatment.builder()
                .name("Special Effects Makeup")
                .description("Creative and dramatic makeup applications for events, parties, or theatrical performances, including prosthetics if needed.")
                .estimatedDuration(60)
                .price(75)
                .pictureUrl("/images/treatments/SpecialEffectsMakeup.jpeg")
                .build();
        Treatment t9 = Treatment.builder()
                .name("Eyebrow Shaping and Tinting")
                .description("Professional shaping and tinting of eyebrows to enhance your natural brow shape and color.")
                .estimatedDuration(45)
                .price(50)
                .pictureUrl("/images/treatments/EyebrowShaping.jpeg")
                .build();
        Treatment t10 = Treatment.builder()
                .name("Photo Shoot Makeup")
                .description("Makeup designed to look perfect under studio lighting and in photographs, ensuring your best look on camera.")
                .estimatedDuration(60)
                .price(125)
                .pictureUrl("/images/treatments/PhotoShootMakeup.jpeg")
                .build();

        treatmentRepository.save(t1);
        treatmentRepository.save(t2);
        treatmentRepository.save(t3);
        treatmentRepository.save(t4);
        treatmentRepository.save(t5);
        treatmentRepository.save(t6);
        treatmentRepository.save(t7);
        treatmentRepository.save(t8);
        treatmentRepository.save(t9);
        treatmentRepository.save(t10);

        Person p1 = Person.builder()
                .firstName("Mihai")
                .lastName("Suciu")
                .phoneNumber("1234567890")
                .dateOfBirth(LocalDate.of(2000, 12, 12))
                .address("Cluj-Napoca, Romania")
                .pictureUrl("/images/persons/c00.jpg")
                .build();
        User u1 = User.builder()
                .email("mihai@makeup.com")
                .password("$2a$10$TPiGd9MxLj51YOqHw/bGr.9LBxFUFcqbOzrFfcMfgoRI884l21mqW")
                .role(Role.ADMIN)
                .person(p1)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
        p1.setUser(u1);

        Person p2 = Person.builder()
                .firstName("Nadine")
                .lastName("Scott")
                .phoneNumber("457898653212")
                .dateOfBirth(LocalDate.of(1985, 07, 15))
                .address("NY, US")
                .pictureUrl("/images/professionals/professional_03.jpg")
                .build();
        User u2 = User.builder()
                .email("nadine@makeup.com")
                .password("$2a$10$xV7hnG2GoeYvwp65GZ3WOeSzuJbJOujVmLBqD.sfgdyRqRHFYBAGW")
                .role(Role.EMPLOYEE)
                .person(p2)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
        p2.setUser(u2);

        Person p3 = Person.builder()
                .firstName("Jane")
                .lastName("Thompson")
                .phoneNumber("1223455678")
                .dateOfBirth(LocalDate.of(1982, 04, 22))
                .address("CA, US")
                .pictureUrl("/images/professionals/professional_01.jpg")
                .build();
        User u3 = User.builder()
                .email("jane@makeup.com")
                .password("$2a$10$KrqWoPcRwi7zFKsGoxrxueLrQB.nXQ6t06cyZyGI3BvBqdUWU9myq")
                .role(Role.EMPLOYEE)
                .person(p3)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
        p3.setUser(u3);

        Person p4 = Person.builder()
                .firstName("Kim")
                .lastName("Kardigan")
                .phoneNumber("659878451245")
                .dateOfBirth(LocalDate.of(1989, 11, 2))
                .address("QC, Canada")
                .pictureUrl("/images/professionals/professional_05.jpg")
                .build();
        User u4 = User.builder()
                .email("kim@makeup.com")
                .password("$2a$10$E3Y0IwXMuzn0V7huGsoUs.K8BB4cDiDCQJEN93dcuu9uN/NXItkAK")
                .role(Role.EMPLOYEE)
                .person(p4)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
        p4.setUser(u4);

        Person p5 = Person.builder()
                .firstName("Angela")
                .lastName("Small")
                .phoneNumber("9685741425")
                .dateOfBirth(LocalDate.of(1995, 8, 28))
                .address("Paris, France")
                .pictureUrl("/images/professionals/professional_04.jpg")
                .build();
        User u5 = User.builder()
                .email("angela@makeup.com")
                .password("$2a$10$7shjDgLoZ3eW7c16cE4/uuRLS3RYLZA1bit0/WOMyco1T1x38zPf2")
                .role(Role.EMPLOYEE)
                .person(p5)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
        p5.setUser(u5);

        Person p6 = Person.builder()
                .firstName("Jully")
                .lastName("Kane")
                .phoneNumber("4145484742")
                .dateOfBirth(LocalDate.of(1992, 2, 12))
                .address("Berlin, Germany")
                .pictureUrl("/images/professionals/professional_02.jpg")
                .build();
        User u6 = User.builder()
                .email("jully@makeup.com")
                .password("$2a$10$YAlt/NCkjuHyKwyrAmhTjOelMNKMiLOAy/t35iJVVpvDnNB/mPSTO")
                .role(Role.EMPLOYEE)
                .person(p6)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
        p6.setUser(u6);

        Person p7 = Person.builder()
                .firstName("Jully")
                .lastName("Kane")
                .phoneNumber("4145484742")
                .dateOfBirth(LocalDate.of(1995, 5, 17))
                .address("Munich, Germany")
                .build();
        User u7 = User.builder()
                .email("rebecca@kong.com")
                .password("$2a$10$3HYWVrA0VIOSlhbuZCFeG.9H46d5BWePNZNZmWbOMKbRAti3TzNhm")
                .role(Role.CUSTOMER)
                .person(p7)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
        p7.setUser(u7);

        personRepository.save(p1);
        personRepository.save(p2);
        personRepository.save(p3);
        personRepository.save(p4);
        personRepository.save(p5);
        personRepository.save(p6);
        personRepository.save(p7);

        userRepository.save(u1);
        userRepository.save(u2);
        userRepository.save(u3);
        userRepository.save(u4);
        userRepository.save(u5);
        userRepository.save(u6);
        userRepository.save(u7);

        EmployeeTreatment et1 = EmployeeTreatment.builder()
                .treatment(t1)
                .employee(p6)
                .build();
        EmployeeTreatment et2 = EmployeeTreatment.builder()
                .treatment(t2)
                .employee(p6)
                .build();
        EmployeeTreatment et3 = EmployeeTreatment.builder()
                .treatment(t3)
                .employee(p5)
                .build();
        EmployeeTreatment et4 = EmployeeTreatment.builder()
                .treatment(t4)
                .employee(p5)
                .build();
        EmployeeTreatment et5 = EmployeeTreatment.builder()
                .treatment(t5)
                .employee(p4)
                .build();
        EmployeeTreatment et6 = EmployeeTreatment.builder()
                .treatment(t6)
                .employee(p4)
                .build();
        EmployeeTreatment et7 = EmployeeTreatment.builder()
                .treatment(t7)
                .employee(p3)
                .build();
        EmployeeTreatment et8 = EmployeeTreatment.builder()
                .treatment(t8)
                .employee(p3)
                .build();
        EmployeeTreatment et9 = EmployeeTreatment.builder()
                .treatment(t9)
                .employee(p2)
                .build();
        EmployeeTreatment et10 = EmployeeTreatment.builder()
                .treatment(t10)
                .employee(p2)
                .build();

        employeeTreatmentRepository.save(et1);
        employeeTreatmentRepository.save(et2);
        employeeTreatmentRepository.save(et3);
        employeeTreatmentRepository.save(et4);
        employeeTreatmentRepository.save(et5);
        employeeTreatmentRepository.save(et6);
        employeeTreatmentRepository.save(et7);
        employeeTreatmentRepository.save(et8);
        employeeTreatmentRepository.save(et9);
        employeeTreatmentRepository.save(et10);
    }
}
