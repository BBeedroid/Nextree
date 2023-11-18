package io.namoosori.java.stream;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class StreamAssist {
    public static void main(String[] args) {

        List<Customer> customers = new ArrayList<>();
        customers.add(new Customer("Song", 45));
        customers.add(new Customer("Kim", 33));
        customers.add(new Customer("Park", 21));
        customers.add(new Customer("Lee", 67));
        customers.add(new Customer("Choi", 19));

        List<String> customersNames = customers.stream()
                .filter(customer -> customer.getAge() > 30)
                .sorted()
                .map(Customer::getName)
                .collect(Collectors.toList());

        for (String name : customersNames) {
            System.out.println(name);
        }

        customers.stream().sorted(Comparator.comparing(Customer::getName)).forEach(System.out::println);

        //30세 이상 데이터 추출
//        List<Customer> list = new ArrayList<>();
//        for (Customer customer : customers) {
//            if (customer.getAge() > 30) {
//                list.add(customer);
//            }
//        }

        //나이 오름차순 정렬
//        Collections.sort(list);
//
//        List<String> results = new ArrayList<>();
//        for (Customer customer : list) {
//            results.add(customer.getName());
//        }
//
//        for (String name : results) {
//            System.out.println(name);
//        }
    }
}
