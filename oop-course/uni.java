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
    private String deptname;
    private List<Professor> professors = new ArrayList<>();

    public Department(int deptid, String deptname) {
        this.deptid = deptid;
        this.deptname = deptname;
    }

    public void addProfessor(Professor p) {
        professors.add(p);
    }

    public void display() {
        System.out.println("Department ID: " + deptid + ", Name: " + deptname);

        for (Professor p : professors) {
            p.display();
        }
    }
}

public class uni {
    public static void main(String[] args) {
        Department d1 = new Department(10, "Computer Science");
        Department d2 = new Department(20, "Mathematics");

        d2.addProfessor(new Professor(102));
        Professor p1 = new Professor(101);
        Professor p2 = new Professor(102);

        Course c1 = new Course(221, 3.0);
        Course c2 = new Course(222, 1.5);

        p1.assignCourse(c1);
        p1.assignCourse(c2);
        p2.assignCourse(c2);

        d1.addProfessor(p1);
        d1.addProfessor(p2);

        d1.display();
    }
}