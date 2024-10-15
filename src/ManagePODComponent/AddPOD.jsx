import React, { useState } from 'react'

export default function AddPOD() {
  const [podName, setPodName] = useState('');
  const [workspace, setWorkspace] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý thêm POD ở đây
    console.log('POD Name:', podName);
    console.log('Workspace:', workspace);
  }

  return (
    <form onSubmit={handleSubmit}>
        <div>
        <label>Cửa hàng:</label>
        <input 
          type="text" 
          value={workspace} 
          onChange={(e) => setWorkspace(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Tên POD:</label>
        <input 
          type="text" 
          value={podName} 
          onChange={(e) => setPodName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Loại POD:</label>
        <input 
          type="text" 
          value={workspace} 
          onChange={(e) => setWorkspace(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Số người:</label>
        <input 
          type="text" 
          value={workspace} 
          onChange={(e) => setWorkspace(e.target.value)} 
          required 
        />
      </div>
      <button className='add' type="submit">Add POD</button>
    </form>
  )
}
