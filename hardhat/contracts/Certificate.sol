// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "./ApiGenerate.sol";

contract Certificate {
  // admin
  address public owner;

  // ApiGenerate api = new ApiGenerate();

  // customer of API are institute and Validators
  enum Role_Access {
    Normal_User,
    Student,
    ThirdPartyValidator,
    University,
    Admin
  }
  // event
  event RoleAssigned(address indexed user, Role_Access role_assigned);
  event ApiGenerates(address indexed user, string apiKey);
  event CertificateIssued(
    address indexed _owner,
    string documentUrl,
    string uniqueId
  );
  event CertificateValidate(
    address indexed _issuer,
    address indexed _owner,
    string documentUrl,
    string indexed uniqueId,
    string remarks
  );

  // struct of user
  struct User {
    address userId;
    Role_Access role_assigned;
    string universityName;
    bool isValid;
  }

  struct CertificateDetail {
    address owner;
    address issuer;
    string documentUrl;
    string uniqueId;
    string courseId;
    string remarks;
    bool isValid;
  }

  // Mappings

  // Access Mapping
  mapping(address => Role_Access) public userPermission;
  mapping(address => User) private userDetail;
  mapping(address => string) private apiKeys;

  // Certificate mapping
  mapping(address => CertificateDetail[]) private userCertificates;
  mapping(string => CertificateDetail) private certificateDetails;
  mapping(string => address) private certificateIssuer;

  // intialize contract and assign admin
  constructor() {
    owner = msg.sender;
    userPermission[msg.sender] = Role_Access.Admin;
    emit RoleAssigned(msg.sender, Role_Access.Admin);
  }

  // modifier for authenticate
  modifier canAccess(Role_Access role) {
    // here those user can access who have more permissions
    require(userPermission[msg.sender] >= role, "You are unauthorize");
    _;
  }

  // assign role or change role
  function modifyRole(
    address _user,
    Role_Access _newRole
  ) external canAccess(Role_Access.Admin) {
    /** are we giving role to student */
    userPermission[_user] = _newRole;
    emit RoleAssigned(_user, _newRole);
  }

  function generateApiKey(
    address _user,
    string memory _universityName,
    Role_Access _role
  ) external canAccess(Role_Access.Admin) {
    User memory newUser = User({
      userId: _user,
      role_assigned: _role,
      universityName: _universityName,
      isValid: true
    });

    // bytes32 _apiToken = api.generateApiToken(_universityName);

    userDetail[_user] = newUser;
    // apiKeys[_user] = string(_apiToken);
    userPermission[_user] = _role;
    apiKeys[_user] = "api_key_gtu";
  }

  /* why function is internal and not used */
  function verifyApiKey(string memory apiKey) internal view returns (address) {
    if (keccak256(bytes(apiKeys[msg.sender])) == keccak256(bytes(apiKey))) {
      return msg.sender; /* why return msg.sender, why not true or false */
    }

    return address(0);
  }

  function generateCertificate(
    address _owner,
    string memory _documentUrl,
    string memory _uniqueId,
    string memory _courseId,
    string memory _remark
  ) external canAccess(Role_Access.University) {
    // check issuer is registerd or not

    CertificateDetail memory dummyCertificate = CertificateDetail({
      owner: _owner,
      issuer: msg.sender,
      documentUrl: _documentUrl,
      uniqueId: _uniqueId,
      courseId: _courseId,
      remarks: _remark,
      isValid: true
    });

    // map certificate with user
    userCertificates[_owner].push(dummyCertificate);

    // map detail with id
    certificateDetails[_uniqueId] = dummyCertificate;

    // map certificate id with university
    certificateIssuer[_uniqueId] = msg.sender;

    emit CertificateIssued(_owner, _documentUrl, _uniqueId);
  }

  function getCertificateDetail(
    string memory _certId
  ) public view returns (CertificateDetail memory) {
    require(userCertificates[msg.sender].length > 0, "Unauthorize access");

    return certificateDetails[_certId];
  }

  function getAllMyCertificates()
    public
    view
    returns (CertificateDetail[] memory)
  {
    require(userCertificates[msg.sender].length > 0, "Unauthorize access");
    return userCertificates[msg.sender];
  }

  function validateCertificate(
    string memory _certId
  ) public canAccess(Role_Access.ThirdPartyValidator) returns (bool) {
    CertificateDetail memory detail = certificateDetails[_certId];
    if (detail.isValid) {
      emit CertificateValidate(
        detail.issuer,
        detail.owner,
        detail.documentUrl,
        detail.uniqueId,
        detail.remarks
      );
      return true;
    }

    return false;
  }

  function discardCertficate(
    address _student,
    string memory _certId
  ) public canAccess(Role_Access.University) {
    require(
      certificateIssuer[_certId] == msg.sender,
      "Unauthorize to made changes"
    );

    for (uint i; i < userCertificates[_student].length; i++) {
      if (
        keccak256(bytes(userCertificates[_student][i].uniqueId)) ==
        keccak256(bytes(_certId))
      ) {
        userCertificates[_student][i].isValid = false;
        certificateDetails[_certId].isValid = false;
      }
    }
  }

  /**** Getter Functions ****/

  function getOwner() external view returns (address) {
    return owner;
  }

  function getUserPermission(
    address _user
  ) external view returns (Role_Access) {
    return userPermission[_user];
  }

  function GetUserDetail(address _user) external view returns (User memory) {
    return userDetail[_user];
  }

  function getApiKeys(address _user) external view returns (string memory) {
    return apiKeys[_user];
  }

  function getCertificateIssuer(
    string memory _certId
  ) external view returns (address) {
    return certificateIssuer[_certId];
  }
}
