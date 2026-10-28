class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void display() {
        System.out.println(name + " " + age);
    }
}

public class practice {
    public static void main(String[] args) {
        Student[] students = new Student[3];

        students[0] = new Student("Rahim", 21);
        students[1] = new Student("Karim", 22);
        students[2] = new Student("Sakib", 20);

        students[0].display();
        students[1].display();
        students[2].display();
    }
}