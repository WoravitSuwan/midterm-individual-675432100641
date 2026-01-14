const repo = require('../../data/repositories/studentRepository');
const validator = require('../validators/studentValidator');

class StudentService {

    async getAllStudents(major, status) {
        const students = await repo.findAll(major, status);

        const stats = {
            active: students.filter(s => s.status === 'active').length,
            graduated: students.filter(s => s.status === 'graduated').length,
            suspended: students.filter(s => s.status === 'suspended').length,
            total: students.length,
            averageGPA: students.length
                ? +(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)
                : 0
        };

        return { students, statistics: stats };
    }

    async getStudentById(id) {
        id = validator.validateId(id);
        const student = await repo.findById(id);
        if (!student) throw new Error('Student not found');
        return student;
    }

    async createStudent(data) {
        validator.validateStudentData(data);
        validator.validateStudentCode(data.student_code);
        validator.validateEmail(data.email);
        validator.validateMajor(data.major);

        return await repo.create(data);
    }

    async updateStudent(id, data) {
        id = validator.validateId(id);
        validator.validateStudentData(data);

        const existing = await repo.findById(id);
        if (!existing) throw new Error('Student not found');

        return await repo.update(id, data);
    }

    async updateGPA(id, gpa) {
        id = validator.validateId(id);
        validator.validateGPA(gpa);

        const student = await repo.findById(id);
        if (!student) throw new Error('Student not found');

        return await repo.updateGPA(id, gpa);
    }

    async updateStatus(id, status) {
        id = validator.validateId(id);
        validator.validateStatus(status);

        const student = await repo.findById(id);
        if (!student) throw new Error('Student not found');
        if (student.status === 'withdrawn') {
            throw new Error('Cannot change status of withdrawn student');
        }

        return await repo.updateStatus(id, status);
    }

    async deleteStudent(id) {
        id = validator.validateId(id);

        const student = await repo.findById(id);
        if (!student) throw new Error('Student not found');
        if (student.status === 'active') {
            throw new Error('Cannot delete active student');
        }

        return await repo.delete(id);
    }
}

module.exports = new StudentService();
