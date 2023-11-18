package io.namoosori.java.functional;

import java.util.ArrayList;
import java.util.List;

public class FunctionalAssist {
    public static void main(String[] args) {
        CustomerService service = new CustomerService();
        initData(service);

        //요구사항 1) 지역으로 검색
//        List<Customer> result = service.searchCustomersByLocation("Seoul");
//        for (Customer customer : result) {
//            System.out.println(customer);
//        }

        //요구사항 2) 성별로 검색
//        result = service.searchCustomersByGender(Gender.Female);
//        for (Customer customer : result) {
//            System.out.println(customer);
//        }

        //하나의 메소드로 요구사항 처리
//        result = service.searchCustomersBy(SearchOption.Location, "Busan");

//        for (Customer customer : result) {
//            System.out.println(customer);
//        }

        //인터페이스를 통한 검색
//        List<Customer> result = new ArrayList<>();
//        result = service.searchCustomers(new SearchFilter() {
//            @Override
//            public boolean isMatched(Customer customer) {
//                if (customer.getLocation().equals("Seoul")) {
//                    return true;
//                } else {
//                    return false;
//                }
//            }
//        });

        //람다 적용
//        result = service.searchCustomers(customer -> customer.getGender().name().equals(Gender.Female));
//
//        for (Customer customer : result) {
//            System.out.println(customer);
//        }

        //stream을 통한 검색
        List<Customer> customers = service.getCustomers();
        customers.stream().filter(customer -> customer.getLocation().equals("Seoul") && customer.getAge() > 40).forEach(System.out::println);
    }

    private static void initData(CustomerService service) {
        service.addCustomer(new Customer("CUS01", "Seoul", Gender.Male, 30));
        service.addCustomer(new Customer("CUS02", "Busan", Gender.Female, 55));
        service.addCustomer(new Customer("CUS03", "Seoul", Gender.Female, 13));
        service.addCustomer(new Customer("CUS04", "Gwangju", Gender.Male, 27));
        service.addCustomer(new Customer("CUS05", "Gwangju", Gender.Female, 61));
        service.addCustomer(new Customer("CUS06", "Incheon", Gender.Male, 29));
        service.addCustomer(new Customer("CUS07", "Seoul", Gender.Male, 42));
        service.addCustomer(new Customer("CUS08", "Seoul", Gender.Female, 45));
        service.addCustomer(new Customer("CUS09", "Seoul", Gender.Female, 33));
        service.addCustomer(new Customer("CUS010", "Busan", Gender.Male, 20));
    }
}
