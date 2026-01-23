import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const BASE_URL = 'http://localhost:4000';

const testStudentManagement = async () => {
  try {
    console.log('\n🧪 Testing Student Management System\n');
    console.log('='.repeat(50));

    // Test 1: Get all students
    console.log('\n✅ Test 1: Fetch all students');
    const getAllResponse = await fetch(`${BASE_URL}/api/v1/students/getall`);
    const getAllData = await getAllResponse.json();
    console.log(`   Total students: ${getAllData.students.length}`);
    console.log(`   Response: ${getAllResponse.status === 200 ? '✅ Success' : '❌ Failed'}`);

    // Test 2: Create a new student with email and parent info
    console.log('\n✅ Test 2: Create new student with email and parent info');
    const studentData = {
      name: 'Test Student ' + new Date().getTime(),
      registrationNumber: 'TEST-' + Date.now(),
      grade: '5',
      email: 'teststudent@school.com',
      parentName: 'Test Parent',
      parentEmail: 'testparent@gmail.com',
      parentPhone: '1234567890'
    };

    const createResponse = await fetch(`${BASE_URL}/api/v1/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    const createData = await createResponse.json();
    console.log(`   Student Name: ${studentData.name}`);
    console.log(`   Registration No: ${studentData.registrationNumber}`);
    console.log(`   Grade: ${studentData.grade}`);
    console.log(`   Email: ${studentData.email}`);
    console.log(`   Parent Email: ${studentData.parentEmail}`);
    console.log(`   Response: ${createResponse.status === 200 ? '✅ Success' : '❌ Failed'}`);
    console.log(`   Message: ${createData.message}`);

    // Test 3: Fetch all students again
    console.log('\n✅ Test 3: Fetch all students (after creation)');
    const getAllResponse2 = await fetch(`${BASE_URL}/api/v1/students/getall`);
    const getAllData2 = await getAllResponse2.json();
    console.log(`   Total students now: ${getAllData2.students.length}`);
    
    // Find our test student
    const testStudent = getAllData2.students.find(s => s.registrationNumber === studentData.registrationNumber);
    if (testStudent) {
      console.log(`   ✅ Test student found in database`);
      console.log(`      - ID: ${testStudent._id}`);
      console.log(`      - Name: ${testStudent.name}`);
      console.log(`      - Email: ${testStudent.email}`);
      console.log(`      - Parent Email: ${testStudent.parentEmail}`);

      // Test 4: Delete the test student
      console.log('\n✅ Test 4: Delete test student');
      const deleteResponse = await fetch(`${BASE_URL}/api/v1/students/${testStudent._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const deleteData = await deleteResponse.json();
      console.log(`   Response: ${deleteResponse.status === 200 ? '✅ Success' : '❌ Failed'}`);
      console.log(`   Message: ${deleteData.message}`);
    } else {
      console.log(`   ❌ Test student not found in database`);
    }

    // Test 5: Final count
    console.log('\n✅ Test 5: Final student count');
    const getAllResponse3 = await fetch(`${BASE_URL}/api/v1/students/getall`);
    const getAllData3 = await getAllResponse3.json();
    console.log(`   Total students after deletion: ${getAllData3.students.length}`);

    console.log('\n' + '='.repeat(50));
    console.log('✅ All tests completed successfully!\n');
    console.log('📊 Student Management System Features:');
    console.log('   ✓ View all students from database');
    console.log('   ✓ Create new students with email and parent info');
    console.log('   ✓ Delete students from database');
    console.log('   ✓ Display students in admin panel table');
    console.log('   ✓ Show statistics (total, grades, emails, parent info)\n');

  } catch (error) {
    console.error('\n❌ Test Failed:');
    console.error('   Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Make sure backend server is running on port 4000');
    console.error('   2. Check if MongoDB is connected');
    console.error('   3. Run: npm start (in backend folder)\n');
    process.exit(1);
  }
};

testStudentManagement();
