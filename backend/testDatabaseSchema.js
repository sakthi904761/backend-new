import mongoose from 'mongoose';
import { Student } from './backend/models/studentSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const testDatabaseConnection = async () => {
  try {
    console.log('🔍 Testing Database Connection...\n');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB\n');
    
    // Check schema
    console.log('📋 Student Schema Fields:');
    const schema = Student.schema.paths;
    Object.keys(schema).forEach(key => {
      if (key !== '_id' && key !== '__v') {
        console.log(`   - ${key}: ${schema[key].instance}`);
      }
    });
    
    console.log('\n📊 Current Students in Database:');
    const students = await Student.find();
    console.log(`   Total: ${students.length} students\n`);
    
    if (students.length > 0) {
      students.forEach((student, index) => {
        console.log(`\n   Student ${index + 1}:`);
        console.log(`   - Name: ${student.name}`);
        console.log(`   - Registration: ${student.registrationNumber}`);
        console.log(`   - Class: ${student.class}`);
        console.log(`   - Email: ${student.email || 'N/A'}`);
        console.log(`   - Parent Name: ${student.parentName || 'N/A'}`);
        console.log(`   - Parent Email: ${student.parentEmail || 'N/A'}`);
        console.log(`   - Parent Phone: ${student.parentPhone || 'N/A'}`);
      });
    } else {
      console.log('   No students found. Add some students to test.');
    }
    
    // Test creating a new student with all fields
    console.log('\n\n✏️ Creating Test Student...');
    const testStudent = await Student.create({
      name: 'John Doe',
      registrationNumber: 'TEST001',
      class: 'A',
      email: 'john@school.com',
      parentName: 'Jane Doe',
      parentEmail: 'jane@email.com',
      parentPhone: '9876543210'
    });
    
    console.log('✅ Test Student Created:');
    console.log(`   - Name: ${testStudent.name}`);
    console.log(`   - Registration: ${testStudent.registrationNumber}`);
    console.log(`   - Class: ${testStudent.class}`);
    console.log(`   - Email: ${testStudent.email}`);
    console.log(`   - Parent Name: ${testStudent.parentName}`);
    console.log(`   - Parent Email: ${testStudent.parentEmail}`);
    console.log(`   - Parent Phone: ${testStudent.parentPhone}`);
    
    console.log('\n✅ Database Connection Test Complete!');
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testDatabaseConnection();
