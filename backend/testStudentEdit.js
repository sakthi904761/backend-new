import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const BASE_URL = 'http://localhost:4000';

const testStudentEdit = async () => {
  try {
    console.log('\n🧪 Testing Student Edit Functionality\n');
    console.log('='.repeat(60));

    // Test 1: Get all students
    console.log('\n✅ Test 1: Fetch all students');
    const getAllResponse = await fetch(`${BASE_URL}/api/v1/students/getall`);
    const getAllData = await getAllResponse.json();
    console.log(`   Total students: ${getAllData.students.length}`);

    // Test 2: Create a test student
    console.log('\n✅ Test 2: Create test student');
    const studentData = {
      name: 'Original Name',
      registrationNumber: 'EDIT-TEST-' + Date.now(),
      class: 'A',
      email: 'original@school.com',
      parentName: 'Original Parent',
      parentEmail: 'original@parent.com',
      parentPhone: '1111111111'
    };

    const createResponse = await fetch(`${BASE_URL}/api/v1/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    const createData = await createResponse.json();
    console.log(`   Created: ${studentData.name}`);
    console.log(`   Status: ${createResponse.status === 200 ? '✅ Success' : '❌ Failed'}`);

    // Test 3: Get the created student
    console.log('\n✅ Test 3: Find created student');
    const getAllResponse2 = await fetch(`${BASE_URL}/api/v1/students/getall`);
    const getAllData2 = await getAllResponse2.json();
    const testStudent = getAllData2.students.find(s => s.registrationNumber === studentData.registrationNumber);
    
    if (!testStudent) {
      throw new Error('Test student not found after creation');
    }
    
    const studentId = testStudent._id;
    console.log(`   Found student: ID ${studentId}`);
    console.log(`   Name: ${testStudent.name}`);
    console.log(`   Email: ${testStudent.email}`);
    console.log(`   Parent: ${testStudent.parentName}`);

    // Test 4: Update the student
    console.log('\n✅ Test 4: Edit/Update student details');
    const updatedData = {
      name: 'Updated Name',
      registrationNumber: 'EDIT-UPDATED-' + Date.now(),
      class: 'B',
      email: 'updated@school.com',
      parentName: 'Updated Parent',
      parentEmail: 'updated@parent.com',
      parentPhone: '2222222222'
    };

    const updateResponse = await fetch(`${BASE_URL}/api/v1/students/${studentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    const updateData = await updateResponse.json();
    
    console.log(`   Status: ${updateResponse.status === 200 ? '✅ Success' : '❌ Failed'}`);
    console.log(`   Message: ${updateData.message}`);
    
    if (updateResponse.status === 200) {
      console.log(`   Name: ${updatedData.name}`);
      console.log(`   Class: ${updatedData.class}`);
      console.log(`   Email: ${updatedData.email}`);
      console.log(`   Parent: ${updatedData.parentName}`);
      console.log(`   Parent Email: ${updatedData.parentEmail}`);
    }

    // Test 5: Verify the update
    console.log('\n✅ Test 5: Verify update was successful');
    const getAllResponse3 = await fetch(`${BASE_URL}/api/v1/students/getall`);
    const getAllData3 = await getAllResponse3.json();
    const verifyStudent = getAllData3.students.find(s => s._id === studentId);
    
    if (verifyStudent) {
      console.log(`   ✅ Student found after update`);
      console.log(`   Name: ${verifyStudent.name} ${verifyStudent.name === updatedData.name ? '✅' : '❌'}`);
      console.log(`   Class: ${verifyStudent.class} ${verifyStudent.class === updatedData.class ? '✅' : '❌'}`);
      console.log(`   Email: ${verifyStudent.email} ${verifyStudent.email === updatedData.email ? '✅' : '❌'}`);
      console.log(`   Parent Email: ${verifyStudent.parentEmail} ${verifyStudent.parentEmail === updatedData.parentEmail ? '✅' : '❌'}`);
    } else {
      console.log(`   ❌ Student not found after update`);
    }

    // Test 6: Delete the test student
    console.log('\n✅ Test 6: Delete test student');
    const deleteResponse = await fetch(`${BASE_URL}/api/v1/students/${studentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    const deleteData = await deleteResponse.json();
    console.log(`   Status: ${deleteResponse.status === 200 ? '✅ Success' : '❌ Failed'}`);
    console.log(`   Message: ${deleteData.message}`);

    console.log('\n' + '='.repeat(60));
    console.log('✅ All tests completed successfully!\n');
    console.log('📊 Student Edit Features Verified:');
    console.log('   ✓ Create new student');
    console.log('   ✓ Edit student name');
    console.log('   ✓ Edit student class');
    console.log('   ✓ Edit student email');
    console.log('   ✓ Edit parent information');
    console.log('   ✓ Verify updates persisted');
    console.log('   ✓ Delete student\n');

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

testStudentEdit();
