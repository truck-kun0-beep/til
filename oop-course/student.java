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

public class student {
    public static void main(String[] args) {
        Student[] students = {
            new Student("Rahim", 21),
            new Student("Karim", 22),
            new Student("Sakib", 20)
        };

        for (Student student : students) {
            student.display();
        }
    }
}