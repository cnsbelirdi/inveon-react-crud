import http from "../HttpCommon";

class TutorialService {
  getAllTutorials() {
    return http.get("tutorials");
  }

  getTutorial(id) {
    return http.get(`tutorials/${id}`);
  }

  addTutorial(tutorial) {
    return http.post("tutorials", tutorial);
  }

  findByTitle(title) {
    return http.get(`tutorials?title=${title}`);
  }

  updateTutorial(tutorial) {
    return http.put(`tutorials/${tutorial.id}`, tutorial);
  }

  deleteTutorial(id) {
    return http.delete(`tutorials/${id}`);
  }
}

export default new TutorialService();
