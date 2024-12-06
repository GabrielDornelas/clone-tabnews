function status(request, response) {
  response.status(200).json({ chave: "primeira API" });
}

export default status;
