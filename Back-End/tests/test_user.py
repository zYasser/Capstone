import pytest
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from app.main import app
from app.config.database import get_db
from test_database import TestingSessionLocal, create_test_database, drop_test_database


# Create tables before running tests
@pytest.fixture(scope="session", autouse=True)
def create_tables():
    create_test_database()
    yield
    drop_test_database()


# Override the get_db dependency with a test database session
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


# # Test cases for each endpoint
# def test_get_current_user():
#     # Create a test user
#     user_data = {"email": "test@example.com", "password": "testpassword"}
#     response = client.post("/api/user/register", json=user_data)
#     assert response.status_code == 201

#     # Get an access token for the test user
#     login_data = {"username": user_data["email"], "password": user_data["password"]}
#     login_response = client.post("/api/user/login", data=login_data)
#     access_token = login_response.json()["access_token"]

#     # Test the get_current_user endpoint
#     headers = {"Authorization": f"Bearer {access_token}"}
#     response = client.get("/api/user/me", headers=headers)
#     assert response.status_code == 200
#     assert response.json()["email"] == user_data["email"]


# def test_reset_password():
#     # Create a test user
#     user_data = {"email": "test@example.com", "password": "testpassword"}
#     response = client.post("/api/user/register", json=user_data)
#     assert response.status_code == 201

#     # Get an access token for the test user
#     login_data = {"username": user_data["email"], "password": user_data["password"]}
#     login_response = client.post("/api/user/login", data=login_data)
#     access_token = login_response.json()["access_token"]

#     # Test the reset_password endpoint
#     headers = {"Authorization": f"Bearer {access_token}"}
#     user_id = response.json()["id"]
#     password_data = {"old_password": "testpassword", "new_password": "newpassword"}
#     response = client.patch(
#         f"/api/user/changepassword/{user_id}", json=password_data, headers=headers
#     )
#     assert response.status_code == 200


# def test_update_account():
#     # Create a test user
#     user_data = {"email": "test@example.com", "password": "testpassword"}
#     response = client.post("/api/user/register", json=user_data)
#     assert response.status_code == 201

#     # Get an access token for the test user
#     login_data = {"username": user_data["email"], "password": user_data["password"]}
#     login_response = client.post("/api/user/login", data=login_data)
#     access_token = login_response.json()["access_token"]

#     # Test the update_account endpoint
#     headers = {"Authorization": f"Bearer {access_token}"}
#     update_data = {"first_name": "John", "last_name": "Doe"}
#     response = client.patch(
#         "/api/user/update_account", json=update_data, headers=headers
#     )
#     assert response.status_code == 200
#     assert response.json()["first_name"] == "John"
#     assert response.json()["last_name"] == "Doe"


# def test_forgetpassword():
#     # Create a test user
#     user_data = {"email": "test@example.com", "password": "testpassword"}
#     response = client.post("/api/user/register", json=user_data)
#     assert response.status_code == 201

#     # Test the forgetpassword endpoint
#     response = client.post(
#         "/api/user/forgetpassword", json={"email": user_data["email"]}
#     )
#     assert response.status_code == 200


# def test_token():
#     # Create a test user
#     user_data = {"email": "test@example.com", "password": "testpassword"}
#     response = client.post("/api/user/register", json=user_data)
#     assert response.status_code == 201

#     # Get a token for password reset
#     response = client.post(
#         "/api/user/forgetpassword", json={"email": user_data["email"]}
#     )
#     assert response.status_code == 200
#     token_id = response.json()["id"]

#     # Test the token endpoint
#     new_password = "newpassword"
#     response = client.post(
#         "/api/user/token", json={"token": token_id, "password": new_password}
#     )
#     assert response.status_code == 200

#     # Verify the password change
#     login_data = {"username": user_data["email"], "password": new_password}
#     login_response = client.post("/api/user/login", data=login_data)
#     assert login_response.status_code == 200


def test_create_user():
    # Test the create_user endpoint
    # Create a test user
    user_data = {
        "email": "test@example.com",
        "password": "testpassword",
        "first_name": "my name",
        "last_name": "last_name",
    }
    response = client.post("/api/user/register", json=user_data)
    print(response.json())
    assert response.status_code == 201
    assert response.json()["email"] == user_data["email"]


def test_create_user_with_no_email():
    # Test the create_user endpoint
    # Create a test user
    user_data = {
        "password": "testpassword",
        "first_name": "my name",
        "last_name": "last_name",
    }
    response = client.post("/api/user/register", json=user_data)
    assert response.status_code == 422


def test_create_user_with_no_password():
    # Test the create_user endpoint
    # Create a test user
    user_data = {
        "email": "test@example.com",
        "password": "testpassword",
        "first_name": "my name",
        "last_name": "last_name",
    }
    response = client.post("/api/user/register", json=user_data)
    assert response.status_code == 400


def test_create_user_with_duplicate_email():
    # Test the create_user endpoint
    # Create a test user
    user_data = {
        "email": "test@example.com",
        "first_name": "my name",
        "last_name": "last_name",
    }
    response = client.post("/api/user/register", json=user_data)
    assert response.status_code == 422


def test_get_user_by_id():
    # Create a test user
    user_data = {
        "email": "texxxxxxxst@example.com",
        "password": "testpassword",
        "first_name": "my name",
        "last_name": "last_name",
    }
    response = client.post("/api/user/register", json=user_data)
    assert response.status_code == 201
    user_id = response.json()["id"]

    # Test the get_user_by_id endpoint
    response = client.get(f"/api/user/?id={user_id}")
    assert response.status_code == 200
    assert response.json()["email"] == user_data["email"]


def test_get_user_by_id_should_return_404():
    user_id = -1

    # Test the get_user_by_id endpoint
    response = client.get(f"/api/user/?id={user_id}")
    assert response.status_code == 404


def test_get_all_user():
    # Create some test users
    user_data_1 = {
        "email": "test1@example.com",
        "password": "testpassword",
        "first_name": "my name",
        "last_name": "last_name",
    }
    user_data_2 = {
        "email": "test2@example.com",
        "password": "testpassword",
        "first_name": "my name",
        "last_name": "last_name",
    }
    response_1 = client.post("/api/user/register", json=user_data_1)
    response_2 = client.post("/api/user/register", json=user_data_2)
    assert response_1.status_code == 201
    assert response_2.status_code == 201

    # Test the get_all_user endpoint
    response = client.get("/api/user")
    assert response.status_code == 200
    assert len(response.json()) != 0


def test_login():

    # Test the login endpoint
    login_data = {"username": "test1@example.com", "password": "testpassword"}
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = client.post("/api/user/login", data=login_data, headers=headers)
    print(response.json())
    assert response.status_code == 200
    assert "access_token" in response.json()


# Test cases for each endpoint
def test_get_current_user():
    # Test the login endpoint
    login_data = {"username": "test1@example.com", "password": "testpassword"}
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    login_response = client.post("/api/user/login", data=login_data, headers=headers)
    access_token = login_response.json()["access_token"]

    # Test the get_current_user endpoint
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.get("/api/user/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == login_data["email"]
