class Person {
    protected String name;
    Person(String name) { this.name = name; }

    void display() {
        System.out.println(name);
    }
}

class Student extends Person {
    private int id;
    Student(String name, int id) {
        super(name);
        this.id = id;
    }
    void display() {

        super.display();
        System.out.println(id);
    }
}

public class p2 {
    public static void main(String[] args) {
        Student s = new Student("Rahim", 101);
        s.display();
    }
}
