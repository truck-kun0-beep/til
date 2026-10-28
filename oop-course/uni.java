import java.util.ArrayList;
import java.util.List;

class Course {
    private int code;
    private double credit;

    public Course(int code, double credit) {
        this.code = code;
        this.credit = credit;
    }

    public void display() {
        System.out.println("Course: " + code +   ", Credit: " + credit);
    }
}

class Professor {
    private int id;
    private List<Course> courses = new ArrayList<>();

    public Professor(int id) {
        this.id = id;
    }

    public void assignCourse(Course c) {
        courses.add(c);
    }

    public void display() {
        System.out.println("Professor ID: " + id);

        for (Course c : courses) {
            c.display();
        }
    }
}

class Department {
    private int deptid;
    private String name;
    private List<Professor> professors = new ArrayList<>();

    public Department(int deptid, String name) {
        this.deptid = deptid;
        this.name = name;
    }

    public void addProfessor(Professor p) {
        professors.add(p);
    }

    public void display() {
        System.out.println("Department ID: " + deptid + ", Name: " + name);

        for (Professor p : professors) {
            p.display();
        }
    }
}

public class uni {
    public static void main(String[] args) {
        Department d = new Department(10, "Computer Science");

        Professor p1 = new Professor(101);
        Professor p2 = new Professor(102);

        Course c1 = new Course(221, 3.0);
        Course c2 = new Course(222, 1.5);

        p1.assignCourse(c1);
        p1.assignCourse(c2);
        p2.assignCourse(c2);

        d.addProfessor(p1);
        d.addProfessor(p2);

        d.display();
    }
}