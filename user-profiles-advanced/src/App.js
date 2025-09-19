import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Form, Input, Button, Card } from "antd";
import { EditOutlined, DeleteOutlined, LikeOutlined } from "@ant-design/icons";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleLike = (id) => {
    alert(`You liked user ID: ${id}`);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setUsers(
        users.map((u) => (u.id === editingUser.id ? { ...u, ...values } : u))
      );
      setIsModalOpen(false);
      setEditingUser(null);
    });
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {users.map((user) => {
          const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;
          return (
            <Col xs={24} sm={12} md={8} key={user.id}>
              <Card
                cover={<img alt={user.username} src={avatarUrl} />}
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEdit(user)} />,
                  <DeleteOutlined key="delete" onClick={() => handleDelete(user.id)} />,
                  <LikeOutlined key="like" onClick={() => handleLike(user.id)} />,
                ]}
              >
                <Card.Meta
                  title={user.name}
                  description={
                    <>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Phone:</strong> {user.phone}</p>
                      <p><strong>Website:</strong> {user.website}</p>
                      <p><strong>Company:</strong> {user.company.name}</p>
                      <p>
                        <strong>Address:</strong> {user.address.suite},{" "}
                        {user.address.street}, {user.address.city}
                      </p>
                    </>
                  }
                />
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
