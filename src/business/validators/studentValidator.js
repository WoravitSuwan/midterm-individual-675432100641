class StudentValidator {

    validateId(id) {
        const num = parseInt(id);
        if (isNaN(num) || num <= 0) {
            throw new Error('Invalid student ID');
        }
        return num;
    }

    validateStudentData(data) {
        const { student_code, first_name, last_name, email, major } = data;
        if (!student_code || !first_name || !last_name || !email || !major) {
            throw new Error('All fields are required');
        }
    }

    validateStudentCode(code) {
        if (!/^\d{10}$/.test(code)) {
            throw new Error('Invalid student code format');
        }
    }

    validateEmail(email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email format');
        }
    }

    validateMajor(major) {
        const majors = ['CS', 'SE', 'IT', 'CE', 'DS'];
        if (!majors.includes(major)) {
            throw new Error('Invalid major');
        }
    }

    validateGPA(gpa) {
        if (gpa < 0 || gpa > 4.0) {
            throw new Error('GPA must be between 0.0 and 4.0');
        }
    }

    validateStatus(status) {
        const statuses = ['active', 'graduated', 'suspended', 'withdrawn'];
        if (!statuses.includes(status)) {
            throw new Error('Invalid status');
        }
    }
}

module.exports = new StudentValidator();
