package io.namoosori.java.functional;

public class Customer {
    private String id;
    private String location;
    private Gender gender;
    private int age;

    public Customer(String id, String location, Gender gender, int age) {
        this.id = id;
        this.location = location;
        this.gender = gender;
        this.age = age;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        return builder.append(id).append(" : ")
                .append(location).append(" : ")
                .append(gender).append(" : ")
                .append(age).toString();
    }
}
