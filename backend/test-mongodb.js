const mongoose = require('mongoose');

// Test MongoDB connection
async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGO_URI || 'mongodb://localhost:27017/techrabbit');
    
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techrabbit');
    console.log('✅ MongoDB connection successful!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ name: 'test' });
    await testDoc.save();
    console.log('✅ Database write test successful!');
    
    await TestModel.deleteOne({ name: 'test' });
    console.log('✅ Database delete test successful!');
    
    await mongoose.disconnect();
    console.log('✅ Connection closed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\nPossible solutions:');
    console.log('1. Make sure MongoDB is installed and running');
    console.log('2. Check if MongoDB service is started');
    console.log('3. Verify the connection string in your .env file');
    console.log('4. If using MongoDB Atlas, make sure the connection string is correct');
  }
}

testConnection();
