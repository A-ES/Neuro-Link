const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const parseLinks = require("../utils/parseLinks")

// Creating notes via post req
router.post('/', async(req,res)=>{
    try{
        const { title, content=""}=req.body;
        const linksTo = parseLinks(content);
        const note = await Note.create({
            title,
            content,
            linksTo
        });
        res.status(201).json(note);

    }
    catch(err){
        res.status(400).json({message:err.message});
    }
    
})

// fetching list of notes(not the content) via GET REQUEST
router.get('/', async(req,res)=>{
    try{
        const notes = await Note.find()
        .select('title _id updatedAt')
        .sort({updatedAt:-1});

        res.json(notes);
    } catch(err){
        res.status(500).json({message:err.message});
    }
});

// fetching a single note 
router.get('/:id', async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      res.json(note);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  //finding the note by id and updating them 
  router.put('/:id', async (req, res) => {
    try {
      const { content = "" } = req.body;
  
      const linksTo = parseLinks(content);
  
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { content, linksTo },
        { new: true }
      );
  
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      res.json(updatedNote);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


module.exports = router;