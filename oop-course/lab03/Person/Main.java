class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("Rahim", 20);
        Person p2 = new Person("Karim", 22);

        System.out.println("Name: " + p1.getName()
                + ", Age: " + p1.getAge());
        System.out.println("Name: " + p2.getName()
                + ", Age: " + p2.getAge());
    }
}
