<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') exit;
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if ($contentType !== "application/json") exit;
$data = json_decode(file_get_contents("php://input"), true);
if (empty($data['name']) || empty($data['last_name'])
|| empty($data['phone']) || empty($data['email'])) exit;

$url = "https://qwertycrm.xyz/api/v1/ExternalLead/6487439ec0e5f7ad6";
$data_post = array(
  "contacts" => array(
    'name' => clear($data['name'].' '.$data['last_name']),
    'phone' => clear($data['phone']),
    'email' => clear($data['email'])
  ),
  "quiz" => array(
    'name' => $data['url_str']
  ),
  'ip' => clear($data['ip']),
  'url' => $data['url_str']
);
$data_post = json_encode($data_post);

$options = array(
  'http' => array(
    'method'  => 'POST',
    'content' => $data_post,
    'header'=>  "Content-Type: application/json\r\n" .
                "Accept: application/json\r\n"
  )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$response = json_decode($result, true);

function clear($req, $simv = 200) {
  return substr(htmlspecialchars(trim($req)), 0, $simv);
}
?>