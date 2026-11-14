class Person {
    String name;
    int age;

    // constructor
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("Sakib", 21);
        Person p2 = new Person("Nusrat", 19);

        System.out.println("Name: " + p1.name + ", Age: " + p1.age);
        System.out.println("Name: " + p2.name+ ", Age: " + p2.age);
    }
}
