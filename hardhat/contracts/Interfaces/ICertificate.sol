// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface ICertificate {
  enum Role_Access {
    Normal_User,
    Student,
    ThirdPartyValidator,
    University,
    Admin
  }

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

  function modifyRole(address _user, Role_Access _newRole) external;

  function generateApiKey(
    address _user,
    string memory _universityName,
    Role_Access _role
  ) external;

  function verifyApiKey(string memory apiKey) external view returns (address);

  function generateCertificate(
    address _owner,
    string memory _documentUrl,
    string memory _uniqueId,
    string memory _courseId,
    string memory _remark
  ) external;

  function getCertificateDetail(
    string memory _certId
  ) external view returns (CertificateDetail memory);

  function getMyAllCertificates()
    external
    view
    returns (CertificateDetail[] memory);

  function validateCertificate(string memory _certId) external returns (bool);

  function discardCertficate(address _student, string memory _certId) external;

  function owner() external view returns (address);

  function userPermission(address _user) external view returns (Role_Access);

  function userDetail(address _user) external view returns (User memory);

  function apiKeys(address _user) external view returns (string memory);

  function userCertificates(
    address _user
  ) external view returns (CertificateDetail[] memory);

  function certificateDetails(
    string memory _certId
  ) external view returns (CertificateDetail memory);

  function certificateIssuer(
    string memory _certId
  ) external view returns (address);
}
